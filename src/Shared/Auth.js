import Config from "./Config";

export const Auth = () => {
    fetch(`${Config.Api}/gatekeeper`)
        .then(response => {
            console.log(response);
            if(response.status !== 200){

            }
        })
}