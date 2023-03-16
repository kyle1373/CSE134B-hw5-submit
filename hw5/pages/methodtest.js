const XMLREQUEST = "xml request";
const FETCHREQUEST = "fetch";

const form = document.querySelector("#formInput");
const xmlButton = document.querySelector("#xmlButton");
const fetchButton = document.querySelector("#fetchButton");
const outputPrompt = document.querySelector("#outputPrompt");

const getBtn = document.querySelector("#getBtn");
getBtn.addEventListener("click", useGet);

const postBtn = document.querySelector("#postBtn");
postBtn.addEventListener("click", usePost);

const putBtn = document.querySelector("#putBtn");
putBtn.addEventListener("click", usePut);

const deleteBtn = document.querySelector("#deleteBtn");
deleteBtn.addEventListener("click", useDelete);

document.getElementById("date").value =
  new Date().toDateString() + " " + new Date().toLocaleTimeString();

function usePost() {
  if (xmlButton.checked) {
    makeRequest(XMLREQUEST, "https://httpbin.org/post", "POST");
  } else {
    makeRequest(FETCHREQUEST, "https://httpbin.org/post", "POST");
  }
}

function useGet() {
  if (xmlButton.checked) {
    makeRequest(XMLREQUEST, "https://httpbin.org/get", "GET");
  } else {
    makeRequest(FETCHREQUEST, "https://httpbin.org/get", "GET");
  }
}

function usePut() {
  if (xmlButton.checked) {
    makeRequest(XMLREQUEST, "https://httpbin.org/put", "PUT");
  } else {
    makeRequest(FETCHREQUEST, "https://httpbin.org/put", "PUT");
  }
}

function useDelete() {
  if (xmlButton.checked) {
    makeRequest(XMLREQUEST, "https://httpbin.org/delete", "DELETE");
  } else {
    makeRequest(FETCHREQUEST, "https://httpbin.org/delete", "DELETE");
  }
}

function setOutput(output) {
  outputPrompt.innerHTML = `
	<h5>${output}</h5>
	`;
}
function setOutputSuccess(id, name, body, date, type) {
  outputPrompt.innerHTML = `
	<h5>Successfully used ${type}!</h5>
	<h5>id: ${id}</h5>
	<h5>name: ${name}</h5>
	<h5>body: ${body}</h5>
	<h5>date: ${date}</h5>
	`;
}

function makeRequest(requestType, url, method) {
  var id = form.id.value;
  var name = form.article_name.value;
  var body = form.article_body.value;
  var date = document.getElementById("date").value;

  const wrappedRequest = {
    id: id,
    name: name,
    body: body,
    date: date,
  };

  switch (requestType) {
    case XMLREQUEST:
      var req = new XMLHttpRequest();
      switch (method) {
        case "GET":
          req.open("GET", url);
          req.setRequestHeader("Content-type", "application/json");
          req.onload = () => {
            if (req.status >= 200 && req.status < 300) {
              setOutput(req.responseText);
              return;
            }
            setOutputSuccess(
              wrappedRequest.id,
              wrappedRequest.name,
              wrappedRequest.body,
              wrappedRequest.date,
              XMLREQUEST
            );
          };
          req.send();
          break;
        case "POST":
          req.open("POST", url, true);
          req.setRequestHeader("Content-type", "application/json");
          req.onload = () => {
            if (req.status >= 200 && req.status < 300) {
              setOutput(req.responseText);
              return;
            }
            setOutputSuccess(
              wrappedRequest.id,
              wrappedRequest.name,
              wrappedRequest.body,
              wrappedRequest.date,
              XMLREQUEST
            );
          };
          req.send(JSON.stringify(wrappedRequest));
          break;
        case "PUT":
          req.open("PUT", url, true);
          req.setRequestHeader("Content-type", "application/json");
          req.onload = () => {
            if (req.status >= 200 && req.status < 300) {
              setOutput(req.responseText);
              return;
            }
            setOutputSuccess(
              wrappedRequest.id,
              wrappedRequest.name,
              wrappedRequest.body,
              wrappedRequest.date,
              XMLREQUEST
            );
          };
          req.send(JSON.stringify(wrappedRequest));
          break;
        case "DELETE":
          req.open("DELETE", url);
          req.setRequestHeader("Content-type", "application/json");
          req.onload = () => {
            if (req.status >= 200 && req.status < 300) {
              setOutput(req.responseText);
              return;
            }
            setOutput("Successfully removed with XML");
          };
          req.send(JSON.stringify(wrappedRequest));
          break;
      }
      break;
    case FETCHREQUEST:
      switch (method) {
        case "GET":
          fetch(url, {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          })
            .then(async (response) => {
              if (!response.ok) {
                setOutput("Error: " + response.text());
                return;
              }
              try {
                setOutput("Got using fetch!");
              } catch (error) {
                console.error("JSON error:", error);
              }
            })
            .catch((error) => console.log(error));
          break;
        case "POST":
          fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(wrappedRequest),
          })
            .then((response) => {
              if (!response.ok) {
                setOutput("Error: " + response.text());
                return;
              }
              try {
                setOutputSuccess(
                  wrappedRequest.id,
                  wrappedRequest.name,
                  wrappedRequest.body,
                  wrappedRequest.date,
                  FETCHREQUEST
                );
              } catch (error) {
                console.error("JSON error:", error);
              }
            })
            .catch((error) => console.log(error));
          break;
        case "PUT":
          fetch(url, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(wrappedRequest),
          })
            .then((response) => {
              if (!response.ok) {
                setOutput("Error: " + response.text());
                return;
              }
              try {
                setOutputSuccess(
                  wrappedRequest.id,
                  wrappedRequest.name,
                  wrappedRequest.body,
                  wrappedRequest.date,
                  FETCHREQUEST
                );
              } catch (error) {
                console.error("JSON error:", error);
              }
            })
            .catch((error) => console.log(error));
          break;
        case "DELETE":
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(wrappedRequest),
          })
            .then((response) => {
              if (!response.ok) {
                setOutput("Error: " + response.text());
                return;
              }
              setOutput("Successfully removed with fetch");
            })
            .catch((error) => console.log(error));
          break;
      }
  }
}
