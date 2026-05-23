import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis(process.env.Redis_URL || "redis://localhost:6379");

//function in which user will give me phone number and I'll give them otp

function otpKey(phone) {
    return `otp:${phone}`; // This function generates a unique key for storing the OTP in Redis based on the user's phone number
}

app.post('/otp', async (req, res) => {
    const { phone } = req.body;
    if(phone.length !== 10){
        return res.status(400).json({ message: 'Invalid phone number' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    await redis.set(otpKey(phone), otp, 'EX', 30); // Store OTP with a TTL of 30 seconds EX means expiry
    res.json({ message: 'OTP sent successfully', otp }); // In production, you would send the OTP via SMS instead of returning it in the response
});

app.post('/otp/verify', async (req, res) => {
    const { phone, otp } = req.body;
    const savedOtp = await redis.get(otpKey(phone)); // Retrieve the OTP from Redis using the phone number

    if(!savedOtp){
        return res.status(400).json({ message: 'OTP expired or not found' }); // If the OTP has expired or is not found, return an error response
    }

    if(savedOtp !== otp){
        return res.status(400).json({ message: 'Invalid OTP' }); // If the provided OTP does not match the saved OTP, return an error response
    }

    // If the OTP is valid, you can proceed with the login process (e.g., generate a session or JWT token)

    await redis.del(otpKey(phone)); // If the OTP is valid, delete it from Redis to prevent reuse
    res.json({ message: 'OTP verified successfully' }); // Return a success response if the OTP is verified
});



app.get('/otp/:phone/ttl', async (req, res) => {
    const ttl = await redis.ttl(otpKey(req.params.phone)); // Get the remaining TTL for the OTP associated with the provided phone number

    if(ttl === -2){
        return res.status(400).json({ message: 'OTP expired! Generate new one.' }); // If the OTP has expired or is not found, return an error response
    }

    res.json({ ttl }); // Return the TTL in the response
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});