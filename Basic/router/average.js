import UserProfile from "../model/usersProfile.model.js";
import User from "../model/users.model.js";

const getProfile = async () => {
  const profile = await UserProfile.find();

  const age = profile.map((item) => {
    const dobYear = item.dob.getFullYear();
    const today = new Date();
    const currentYear = today.getFullYear();
    const age = currentYear - dobYear;

    //   age >25 ? console.log(item._id) : ""

    // const id = age > 25 ? item._id : 0

    // UserProfile.findByIdAndDelete(id)

    return age;
  });

  const sum = age.reduce((add, item) => {
    return add + item;
  }, 0);

  const average = Math.floor(sum / age.length);
  console.log(`Average is ${average}`);

  //! for deletion
  const idList = profile
    .filter((item) => {
      const dobYear = item.dob.getFullYear();
      const today = new Date();
      const currentYear = today.getFullYear();
      const age = currentYear - dobYear;
      return age > 25;

      //   age >25 ? console.log(item._id) : ""

      // const id = age > 25 ? item._id : 0

      // UserProfile.findByIdAndDelete(id)
    })
    .map((item) => ({
      id: item._id,
      userid: item.userId,
    }));
  //  console.log(idList)

  const id = idList.map((item) => item.id);

  const userid = idList.map((item) => item.userid);

  // const userId =  await UserProfile.find({userId : {$in : id}})
  // console.log(userId)

  await User.deleteMany({ _id: { $in: userid } });
  await UserProfile.deleteMany({ _id: { $in: id } });
};

export default getProfile;
