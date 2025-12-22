const client = window.supabase.createClient(
    "https://zxubbefxpazioajehfhf.supabase.co",
    "sb_publishable_qy3FLPFdwpoAb0my107Vjw_ndi60_3Z"
);

const googleLogin = document.querySelector("#login > form > .socials > .google");

async function loginWithGoogle() {
    await client.auth.signInWithOAuth({
        provider: "google"
    });
}

googleLogin.addEventListener("click", loginWithGoogle());