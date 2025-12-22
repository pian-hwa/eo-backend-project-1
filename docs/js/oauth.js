const client = window.supabase.createClient(
    "https://zxubbefxpazioajehfhf.supabase.co",
    "sb_publishable_qy3FLPFdwpoAb0my107Vjw_ndi60_3Z"
);

async function loginWithGoogle() {
    await client.auth.signInWithOAuth({
        provider: "google"
    });
}