const client = window.supabase.createClient(
    "https://zxubbefxpazioajehfhf.supabase.co",
    "sb_publishable_qy3FLPFdwpoAb0my107Vjw_ndi60_3Z"
);

const googleLogin = document.querySelector("#login > form > .socials > .google");

async function loginWithGoogle() {
    await client.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "https://pian-hwa.github.io/eo-backend-project-1/"
        }
    });
}

googleLogin.addEventListener("click", loginWithGoogle());