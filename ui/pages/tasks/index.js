// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ task_type: 'Feed', cattle_type: 'Cow' });
}
