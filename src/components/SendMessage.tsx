"use server";

export async function sendMessage(formData: FormData) {
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("comments");

    console.log("Contact form submission:", {
        firstName,
        lastName,
        email,
        subject,
        message,
    });

    return { success: true };
}
