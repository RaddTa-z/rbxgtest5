import { Router, Request, Response } from 'express';
import axios, { AxiosRequestHeaders } from 'axios';

const router = Router();
const ROBLOX_ECONOMY_API_BASE_URL = 'https://economy.roblox.com';
const ROBLOX_COOKIE = '_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_4011DFE40410C7184EE165D3C439118DA6831902503BF38253B9A03A6B949BF3520774EC71229C0C985313336D123C73C63DEB5B28B3E39437D701B8EC3A891CB655FDEDAEAEB302DD4A3233A941DA7992AA8B56EDD8CB900A66495E71227A06157B23C146CBC5F7229D006BF7E430FC43856F8BF7D6998DE0734CA29C7131AE0D144C78D6DF47F6E646868304C85342FFECC854A4605E4FA9509B1FB00BDC9C2A88F2661B64AAB02B8C776A02A28AA957414E64A380552CFF02BD46DE95EECE77E411AB1CB6FBB6A88FD83B45F32A186ECFDC844BEFAE26C995ED6C7B26AF45DC30221AEFCBE0B59BF9D1D6B470F0538C3EE496B29E2DA875CABC2C6DCF6629CA0D6EC019A2CD2BC58AE8E025BFBC23F1DA48AC1C0D97A3372364BAC6CBC8D4FCB0339A1D5F65B8683641FB18A13E4020056ABA587567E5AC99B57F285FEBE86681E7F4029F58951E0BE293A2FE615E891AD007AAFDE0CD9121B953F2818973A469B4E4B9DC039A4993C1A1C81E0B21B7FC28F81429222111D8A505F9EC6C1F34AB8258CD369D4DAB34F0857DA6C59455DF68E7AD9899F18E9ADB6446DDA753F52D0276B6C2A81BB1CB3A67BB92057B310FF6AA06F82256E8B19D85DECFC847DB9BA736';

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
