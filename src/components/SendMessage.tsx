"use server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

export async function sendMessage(formData: FormData) {
    const firstName = formData.get("firstname") as string;
    const lastName = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("comments") as string;

    try {
        const res = await fetch(`${API_BASE}/api/public/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
            body: JSON.stringify({ firstName, lastName, email, subject, message }),
        });
        const data = await res.json();
        return { success: data.success, message: data.message };
    } catch (error) {
        console.error("Contact form submission error:", error);
        return { success: false, message: 'Failed to send message. Please try again.' };
    }
}
