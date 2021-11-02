import { NextApiRequest, NextApiResponse } from 'next';

export default function verifyPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sitePassword = process.env.SITE_PASSWORD;
  const { password } = JSON.parse(req.body);

  if (sitePassword && sitePassword.length > 0 && password === sitePassword) {
    return res.status(200).send(undefined);
  } else {
    return res.status(401).send(undefined);
  }
}
