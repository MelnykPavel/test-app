const modal = document.getElementById("modalBox");

const sendRequest = async (data) => {
  modal.style.display = "flex";
  try {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    });

    const responseData = await response.json();
    modal.style.display = "none";
    if (responseData.success) {
      window.location.href = "../index.html";
    }
  } catch (error) {
    console.log(`error`);
  }
};

const refactoring = () => {
  const getOption = document.querySelectorAll("select > option");

  let data = [];
  let lastParent = 0;
  let lastAncestors = [];
  let lastNumOfnbsp = 0;

  getOption.forEach((option) => {
    let numOfnbsp = option.innerHTML.split("&nbsp;").length - 1;
    let arrLength = lastAncestors.length - 1;
    if (numOfnbsp === 0) {
      lastAncestors = [];
      data.push({
        title: option.innerText.trim(),
        value: +option.value,
        ancestors: [],
        parent: 0,
      });
    }

    if (lastNumOfnbsp < numOfnbsp) {
      lastAncestors.push(lastParent);
      data.push({
        title: option.innerText.trim(),
        value: +option.value,
        ancestors: lastAncestors.slice(0),
        parent: lastParent,
      });
    }

    if (lastNumOfnbsp === numOfnbsp && numOfnbsp !== 0) {
      data.push({
        title: option.innerText.trim(),
        value: +option.value,
        ancestors: lastAncestors.slice(),
        parent: lastAncestors[arrLength],
      });
    }

    if (lastNumOfnbsp > numOfnbsp && numOfnbsp !== 0) {
      let sequenceQuantity = (lastNumOfnbsp - numOfnbsp) / 4;
      lastAncestors = lastAncestors.slice(0, -sequenceQuantity);
      data.push({
        title: option.innerText.trim(),
        value: +option.value,
        ancestors: lastAncestors.slice(),
        parent: lastAncestors[lastAncestors.length - 1],
      });
    }
    lastParent = +option.value;

    lastNumOfnbsp = numOfnbsp;
  });
  sendRequest(data);
};
