import {Strategy} from "passport-local";
import {inject} from "inversify";
import {TYPES} from "../../constant/types";
import {UserService} from "../../service/user.service";
import {provide, provideSingleton} from "../../ioc/ioc";
import {Passport} from "passport";

@provideSingleton(TYPES.LocalStrategy)
export class LocalStrategy {

  constructor(@inject(TYPES.UserService) private userService: UserService) {
  }

  getStrategy() {
    return new Strategy({
      usernameField: 'email'
    }, (email, password, done) => {
      this.userService.findOne({email}, (err, user) => {
        if (err) {
          return done(err);
        }

        console.log(user);

        if (!user || !user.checkPassword(password)) {
          return done(null, false, {message: 'Invalid login credentials'});
        }
        return done(null, user);
      })
    });
  }

}