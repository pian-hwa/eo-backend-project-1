const googleLogin = document.querySelector("#login > form > .socials > .google");

googleLogin?.addEventListener("click", async function () {
    await client.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "https://pian-hwa.github.io/eo-backend-project-1/"
        }
    });
});