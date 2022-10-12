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
      content: content.contents,
      enableOption1: content["enable-option-1"],
      enableOption2: content["enable-option-2"],
      enableOption3: content["enable-option-3"],
      enableOption4: content["enable-option-4"],
      enableNotApplicable: content["enable-not-applicable-option"],
      option1Label: content["option-1-label"],
      option2Label: content["option-2-label"],
      option3Label: content["option-3-label"],
      option4Label: content["option-4-label"],
      actionIfSelected1: content["action-if-selected-1"],
      actionIfSelected2: content["action-if-selected-2"],
      actionIfSelected3: content["action-if-selected-3"],
      actionIfSelected4: content["action-if-selected-4"],
      option1Comment: content["enable-option-1-comment"],
      option2Comment: content["enable-option-2-comment"],
      option3Comment: content["enable-option-3-comment"],
      option4Comment: content["enable-option-4-comment"],
      option1FileUpload: content["enable-option-1-file-upload"],
      option2FileUpload: content["enable-option-2-file-upload"],
      option3FileUpload: content["enable-option-3-file-upload"],
      option4FileUpload: content["enable-option-4-file-upload"],
      option1EnableWeighting:
        typeof content["option-1-weighting"] === "number" ? true : false,
      option2EnableWeighting:
        typeof content["option-2-weighting"] === "number" ? true : false,
      option3EnableWeighting:
        typeof content["option-3-weighting"] === "number" ? true : false,
      option4EnableWeighting:
        typeof content["option-4-weighting"] === "number" ? true : false,
      option1Weighting: content["option-1-weighting"],
      option2Weighting: content["option-2-weighting"],
      option3Weighting: content["option-3-weighting"],
      option4Weighting: content["option-4-weighting"],
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
