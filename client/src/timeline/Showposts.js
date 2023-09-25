// get all posts to show in homwpage
export const alluserposts = async () => {
    // console.log("i got a call , i am in showposts ");
    fetch("/showpost", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then((res) => {
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
            // console.log("converting to json");
            return res.json();
        })
        .then((data) => {
            // Use map and concat to extract and flatten all posts into a single array
            console.log("returning maping data");
            return data.data.flatMap((user) => user.posts);
        })
        .catch((err) => {
            console.log(err);
        });
}
