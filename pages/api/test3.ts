import { NextApiRequest, NextApiResponse } from 'next';

async function test(req: NextApiRequest, res: NextApiResponse) {
    res.json({ code: 200, message: 'test3' });
}

export default test;
