import { NextApiRequest, NextApiResponse } from 'next';

async function test(req: NextApiRequest, res: NextApiResponse) {
    res.json({ code: 200, message: 'test5' });
}

export default test;
