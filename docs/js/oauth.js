const client = window.supabase.createClient(
    "https://zxubbefxpazioajehfhf.supabase.co",
    "sb_publishable_qy3FLPFdwpoAb0my107Vjw_ndi60_3Z"
);

const googleLogin = document.querySelector("#login > form > .socials > .google");

googleLogin.addEventListener("click", async function () {
    await client.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "https://pian-hwa.github.io/eo-backend-project-1/"
        }
    });
});

(async () => {
    const { data, error } = await client.auth.getSession();

    console.log(data); // ← 이건 반드시 찍혀야 정상

    if (!data.session) {
        location.href = '/eo-backend-project-1/members/login.html';
        return;
    }

    console.log(data.session.user);
})();