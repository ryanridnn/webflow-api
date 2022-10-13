const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/form1contents", async (req, res) => {
  const contentResp = await axios({
    url: "https://api.webflow.com/collections/6346b76c4b362ee0fe35c197/items",
    method: "GET",
    headers: {
      Authorization:
        "Bearer 8da4c236c0f49a9ad5e1e47a39edcf45db3e338c13cbf14d67c3abd078675fad",
    },
  });

  const questionGroupsResp = await axios({
    url: "https://api.webflow.com/collections/6346b4d00e39463ed13c1951/items",
    method: "GET",
    headers: {
      Authorization:
        "Bearer 8da4c236c0f49a9ad5e1e47a39edcf45db3e338c13cbf14d67c3abd078675fad",
    },
  });

  // console.log(contentResp.data);
  // console.log(questionGroupsResp.data);

  const questionGroups = questionGroupsResp.data.items;

  let contents = contentResp.data.items.map((content) => {
    return {
      ...content,
      contents: content.contents.map((questionGroupId) => {
        const questionGroup = questionGroups.find(
          (questionGroup) => questionGroup._id === questionGroupId
        );

        if (!questionGroup) {
          return {};
        } else {
          return {
            sectionTitle: questionGroup["section-title"],
            questions: questionGroup.questions,
          };
        }
      }),
    };
  });

  contents = contents.map((content) => {
    return {
      _id: content._id,
      name: content.name,
      contents: content.contents,
      settingsPreset: content["settings-preset"],
    };
  });

  res.status(200).json(contents);
});

app.get("/test", async (req, res) => {
  const resp = await axios({
    url: "https://api.webflow.com/collections/6331444324771a7fc18695e9/items",
    method: "GET",
    headers: {
      Authorization:
        "Bearer 8da4c236c0f49a9ad5e1e47a39edcf45db3e338c13cbf14d67c3abd078675fad",
    },
  });

  res.status(200).json(resp.data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server has started on PORT ${process.env.PORT || 3000}`);
});
