const ObjectId = require("mongodb").ObjectId;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app, db) {
  app
    .route("/api/drylandWorkouts")

    .get(function (req, res) {
      db.collection("drylandWorkouts")
        .find({})
        .toArray((err, workouts) => {
          if (err) return res.json(`could not find entries: ${err}`);
          const workoutsArray = workouts.map((entry) => {
            let workout = {
              _id: entry._id,
              title: entry.workout_name,
              commentcount: entry.num_of_comments,
            };
            return workout;
          });
          res.json(workoutsArray);
        });
    })

    .post(function (req, res) {
      if (!req.body.title) return res.json("please submit a title");
      const workout = {
        workout_title: req.body.title,
        num_of_comments: 0,
        comments: [],
      };
      db.collection("drylandWorkouts").insertOne(workout, (err, doc) => {
        if (err) res.json(`could not update: ${err}`);
        const entry = { _id: doc.insertedId, title: workout.workout_title };
        res.json(entry);
      });
    })

    .delete(function (req, res) {
      db.collection("drylandWorkouts").deleteMany({}, (err, data) => {
        if (err) res.json(`could not delete: ${err}`);
        res.json("complete delete successful");
      });
    });

  app
    .route("/api/drylandWorkouts/:id")
    .get(function (req, res) {
      const workoutId = req.params.id;
      db.collection("drylandWorkouts")
        .find({ _id: new ObjectId(workoutId) })
        .toArray((err, data) => {
          if (err) res.json(`could not find ${workoutId} ${err}`);
          if (data[0]) {
            const workout = {
              _id: data[0]._id,
              title: data[0].workout_title,
              comments: data[0].comments,
            };
            res.json(workout);
          } else {
            console.log(workoutId);
            res.json(`no workout exists`);
          }
        });
    })

    .post(function (req, res) {
      const workoutId = req.params.id;
      const comment = req.body.comment;
      db.collection("drylandWorkout").findAndModify(
        { _id: new ObjectId(workoutId) },
        {},
        { $inc: { num_of_comments: 1 }, $push: { comments: comment } },
        { new: true, upsert: false },
        (err, data) => {
          if (err) res.json(`could not update ${workoutId} ${err}`);
          const workout = {
            _id: data.value._id,
            title: data.value.workout_title,
            comments: data.value.comments,
          };
          res.json(workout);
        }
      );
    })

    .delete(function (req, res) {
      const workoutId = req.params.id;
      db.collection("drylandWorkout").findOneAndDelete(
        { _id: new ObjectId(workoutId) },
        (err, doc) => {
          if (err) {
            res.send(`could not delete ${workoutId} ${err}`);
          } else {
            doc.value
              ? res.json(`delete successful`)
              : res.json(`no workout exists`);
          }
        }
      );
    });
};
