import User from '../models/User';
import JwtService from '../services/jwt.service';
import * as Yup from 'yup';
import { Errors } from '../utils/errors';
import moment from 'moment';

let loginController = {
  login: async (req, res) => {
    try {
      console.log({ login_params: req.body });
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body)))
        return res.status(400).json({ error: Errors.VALIDATION_FAILS });

      let { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(400).send({ error: Errors.NONEXISTENT_USER });

      if (!(await user.checkPassword(password)))
        return res.status(401).send({ error: Errors.WRONG_PASSWORD });

      //const token = JwtService.jwtSign(user.id);

      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

  logout: async (req, res) => {
    try {
      JwtService.jwtBlacklistToken(JwtService.jwtGetToken(req));

      res.status(200).json({ msg: 'Authorized' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

  test: async (req, res) => {
    return res.status(200).json({
      server_time: `sample response to show server is up & running, time: ${moment().format()}`,
    });
  },
};

export default loginController;
