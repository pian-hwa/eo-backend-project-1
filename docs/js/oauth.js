const client = window.supabase.createClient(
    "https://zxubbefxpazioajehfhf.supabase.co",
    "sb_publishable_qy3FLPFdwpoAb0my107Vjw_ndi60_3Z"
);

(async () => {
    const { data, error } = await client.auth.getSession();

    console.log(data); // ← 이건 반드시 찍혀야 정상

    if (!data.session) {
        location.href = '/eo-backend-project-1/members/login.html';
        return;
    }

    console.log(data.session.user);
})();