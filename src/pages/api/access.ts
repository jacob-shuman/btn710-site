import { NextApiRequest, NextApiResponse } from 'next';

export default function verifyPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sitePasswordA = process.env.SITE_PASSWORD_A;
  const sitePasswordB = process.env.SITE_PASSWORD_B;
  const { password } = JSON.parse(req.body);

  if (
    (sitePasswordA && sitePasswordA.length > 0 && password === sitePasswordA) ||
    (sitePasswordB && sitePasswordB.length > 0 && password === sitePasswordB)
  ) {
    return res.status(200).send(undefined);
  } else {
    return res.status(401).send(undefined);
  }
}
