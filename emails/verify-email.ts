export function verifyEmailTemplate(
    name: string,
    otp: string
) {
    return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8" />

<title>Verify your email</title>

</head>

<body style="font-family:Arial;padding:40px;background:#fafafa">

<h2>Hello ${name} 👋</h2>

<p>

Welcome to <strong>Saathi</strong>.

</p>

<p>

Use the OTP below to verify your email.

</p>

<h1
style="
letter-spacing:8px;
font-size:40px;
color:#4F46E5;
"
>

${otp}

</h1>

<p>

This OTP expires in 10 minutes.

</p>

</body>

</html>
`;
}