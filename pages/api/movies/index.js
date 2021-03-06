import { getSession } from 'next-auth/client';

import dbConnect from 'utils/dbConnect';
import Movie from 'models/Movie';
import Feed from 'models/Feed';
import User from 'models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });

  switch (method) {
    case 'GET':
      try {
        const movies = await Movie.find({ user: session.id });

        res.status(200).json({ success: true, data: movies.reverse() });
      } catch (error) {
        console.log('error', error);

        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const movie = await Movie.create({ ...req.body, user: session.id });

        await Feed.create({ action: 'add', movie, user: session.id });

        await User.findByIdAndUpdate(
          { _id: session.id },
          { $push: { movies: movie._id } },
          { new: true },
        );

        res.status(201).json({ success: true, data: movie });
      } catch (error) {
        console.log('error', error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
