const json = {
  "CaseMsg": {
    "Bd": {
      "Case": [
        {
          "Shp": [
            {
              "ShpKey": { "$": "5352588850" },
              "ShpInfReq": [
                {
                  "InfReqId": "a0eb8b79-f65d-4307-1b8e-8fbd17728fbf",
                  "InfDefId": "99c156b4-2d99-4687-9a06-c09b4b137d2b",
                  "InfDatEntRec": [
                    {
                      "@InfDatEntId": "cc33ec86-9745-427c-9e55-6f3057c1ce02",
                      "InfDatEntRec": [
                        {
                          "@InfDatEntId": "b3df2998-236b-463d-8308-aa7ebfce4c85",
                          "InfDatEntRec": [
                            {
                              "@InfDatEntId": "8073258d-b004-43b4-9235-5bab7ebf9585",
                              "Att": [
                                {
                                  "@AttDefId": "31cc526c-1b77-4bbd-a9d9-fb1337ebdf6f",
                                  "Val": ""
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "@InfDatEntId": "8d7c66ff-0ce5-4640-900e-75d6aa6de07a",
                      "InfDatEntRec": [
                        {
                          "@InfDatEntId": "fa135756-d6f6-4407-a4a9-356735ca1687",
                          "InfDatEntRec": [
                            {
                              "@InfDatEntId": "4dd648be-45b8-4d2e-a11b-bfd4a0ff0877",
                              "Att": [
                                {
                                  "@AttDefId": "ae72c708-db96-4e6a-b48a-2d3d6c57e3af",
                                  "Val": ""
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
};

function extractInfDatEntId(json, attDefId) {
  let result = null;

  function findInfDatEntId(obj) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        findInfDatEntId(obj[i]);
      }
    } else if (typeof obj === 'object' && obj !== null) {
      if (obj.hasOwnProperty('@InfDatEntId') && obj.hasOwnProperty('InfDatEntRec')) {
        const rec = obj.InfDatEntRec[0];
        if (rec.hasOwnProperty('@InfDatEntId') && rec.hasOwnProperty('Att')) {
          const att = rec.Att[0];
          if (att.hasOwnProperty('@AttDefId') && att['@AttDefId'] === attDefId) {
            result = rec['@InfDatEntId'];
            return;
          }
        }
      }
      for (let key in obj) {
        findInfDatEntId(obj[key]);
      }
    }
  }

  findInfDatEntId(json);
  return result;
}

const attDefId = 'ae72c708-db96-4e6a-b48a-2d3d6c57e3af';
const infDatEntId = extractInfDatEntId(json, attDefId);
console.log(infDatEntId); // Output: 4dd648be-45b8-4d2e-a11b-bfd4a0ff0877
