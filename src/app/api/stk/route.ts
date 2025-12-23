import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phoneNumber, amount } = await request.json();

    // 1. Get Access Token
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` }
    });
    const { access_token } = await tokenRes.json();

    // 2. Prepare Timestamp and Password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    // Note: In Production, 174379 changes to his Shortcode/Till
    const password = Buffer.from(`174379${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

    // 3. The STK Push Request
    const res = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: "174379", // Use Sandbox code for tomorrow
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", // Standard for STK Push
        Amount: amount || 1, 
        PartyA: phoneNumber, // The Customer
        PartyB: "174379", // FOR DEMO: Keep as 174379. FOR LIVE: Use his shortcode
        PhoneNumber: phoneNumber,
        CallBackURL: "https://yourdomain.com/api/callback",
        AccountReference: "WakazuriBrand",
        TransactionDesc: "Design Payment"
      })
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "STK Push Failed" }, { status: 500 });
  }
}