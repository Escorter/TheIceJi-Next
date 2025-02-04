import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

const HelloAPI = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' })
}

export default HelloAPI