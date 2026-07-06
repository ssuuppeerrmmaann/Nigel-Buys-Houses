import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Provider configuration
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/gmail.send');

let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess: (user: User, token: string) => void,
  onAuthFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token might have expired or wasn't cached in this session.
        // We will need the user to log in again if we need the Google API access token.
        onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure();
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google access token');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Log out
export const googleSignOut = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Append a lead to the Google Spreadsheet
export const appendLeadToGoogleSheet = async (accessToken: string, lead: any): Promise<boolean> => {
  const spreadsheetId = '1sy123NFntbOff-jOqcAFrGJj4Yv4uQU1IMz5vhxKijA';
  // Use "A:H" as range, Google Sheets automatically appends at the bottom
  const range = 'Sheet1!A:H'; 
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const values = [
    [
      lead.timestamp || new Date().toISOString(),
      lead.address || '',
      lead.city || '',
      lead.state || '',
      lead.zipCode || '',
      `${lead.firstName || ''} ${lead.lastName || ''}`.trim(),
      lead.phone || '',
      lead.email || '',
      lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : '',
      lead.status || 'New'
    ]
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        majorDimension: 'ROWS',
        values: values
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API Error response:', errorText);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error appending to Google Sheet:', err);
    return false;
  }
};

// Send email notification via Gmail API
export const sendEmailNotification = async (accessToken: string, lead: any): Promise<boolean> => {
  const url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';

  const subject = `🔥 New Lead Submitted: ${lead.address}, ${lead.city}`;
  const bodyText = `
    <h3>New Nigel Buys Houses Lead Submission</h3>
    <hr />
    <p><strong>Property Address:</strong> ${lead.address}, ${lead.city}, ${lead.state} ${lead.zipCode}</p>
    <p><strong>Seller Name:</strong> ${lead.firstName} ${lead.lastName}</p>
    <p><strong>Phone Number:</strong> ${lead.phone}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Estimated Valuation:</strong> $${lead.estimatedValue ? lead.estimatedValue.toLocaleString() : 'N/A'}</p>
    <p><strong>Timestamp:</strong> ${lead.timestamp}</p>
    <br />
    <p style="color: #666; font-size: 11px;">This email notification was triggered automatically via the Nigel Buys Houses CRM Portal.</p>
  `.trim();

  const emailLines = [
    `To: contact@cnigelinvestments.biz`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    `Content-Type: text/html; charset=utf-8`,
    `MIME-Version: 1.0`,
    ``,
    bodyText
  ];

  // Base64url encode the MIME email message
  const rawEmail = btoa(unescape(encodeURIComponent(emailLines.join('\r\n'))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        raw: rawEmail
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gmail API Error response:', errorText);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error sending email via Gmail:', err);
    return false;
  }
};
