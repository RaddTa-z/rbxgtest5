import { Router, Request, Response } from 'express';
import axios, { AxiosRequestHeaders } from 'axios';

const router = Router();
const ROBLOX_ECONOMY_API_BASE_URL = 'https://economy.roblox.com';
const ROBLOX_COOKIE = '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_7C1943F6B6325CB3C6DEA2946F0ED0F9CC9948A3401A8D2AC383889128C9E34948E025D2604C42375EBF33D7CF8F13796146F00E2ED90C082DA96C569C6E210BBFBF793E3EE572CF5ACC2F51B4FA3FD26B6683915561DFA8DDEAE058764CABAFA9163664F0246D4ECC67E4F1469BE996387F2DFED51C028DAD43C213FC99564C06C67D1838AC19EA0C7A54D692099755D6924807BD31BCFC645764E89166D6DA3F5B88493B568D4408A7714C13079933C29BF64ED75474DEAC4E5ECB399FC8EAA4A07A2BBC62908E437C2B47D682BF7E431F851C8E7CF80C0DC4763EF55B639117BDB37A83A6B475993F078E293F127E5A20CD820E7FCCC124A66DF196587087BB5F1AE26EED6E41C04730DE40CDC0A3ECDCCD9EF9F7A5FB067180B5E89430A4C66989EE4AC2AF144D736C4B0E426B7100737E44B5E8859361F8D68DEC0A7BF28D21E2FBD3D7773BD77D9A298CED0A75151BF4B93ECF2290E45CCE00E4B1B4CBD4E936AFB70357B5EB99A50A6087F02AB0160BFA7E460AF357251277A279497B0CAA615F';

router.use('/*', async (req: Request, res: Response) => {
    try {
        const endpoint = req.params[0]; // Capture the full path after /economy/
        const robloxResponse = await axios({
            method: req.method,
            url: `${ROBLOX_ECONOMY_API_BASE_URL}/${endpoint}`,
            headers: {
                ...req.headers as AxiosRequestHeaders,
                host: 'economy.roblox.com', // Ensure the correct host header
                cookie: `.ROBLOSECURITY=${ROBLOX_COOKIE}`, // Include the Roblox cookie
            },
            data: req.body,
        });
        res.status(robloxResponse.status).json(robloxResponse.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'An error occurred while processing the request.' });
        }
    }
});

export default router;
