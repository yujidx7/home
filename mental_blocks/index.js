function onloadForIndexPage() {
    loadFile('./questions.json', generateHtmlForIndexPage);
}

function onloadForQuestionPage() {
    loadFile('./questions.json', generateHtmlForQuestionPage);
}

function loadFile(path, onSuccess) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            onSuccess(text);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function generateHtmlForIndexPage(questions_text) {
    // json
    const questions_json = JSON.parse(questions_text);

    // generate html
    const container_element = document.getElementById('container');
    document.body.appendChild(container_element);

    questions_json.questions.forEach(function (question) {
        const path = 'question.html' + '?id=' + question.id.toString();
        const linkName = question.name + ' (' + question.id + ')';
        container_element.appendChild(generateLinkElement(path, linkName));
    });
}

function generateHtmlForQuestionPage(questions_text) {
    // get parameter in url
    const urlParams = new URLSearchParams(window.location.search);
    const questionIdString = urlParams.get('id');
    const questionId = parseInt(questionIdString);

    // json
    const questions_json = JSON.parse(questions_text);

    // generate html
    const question = questions_json.questions[questionId];

    const container_element = document.getElementById('container');
    document.body.appendChild(container_element);

    const h1_element = document.createElement("h1");
    h1_element.textContent = question.name + ' (' + question.id + ')';
    container_element.appendChild(h1_element);

    question.question_image_urls.forEach(function (image_path, image_index) {
        const imageDivId = 'image_div_' + image_index.toString();
        const image_div_element = generateDivElement(imageDivId);
        container_element.appendChild(image_div_element);

        const path = question.id.toString() + '/' + image_path;
        const linkName = (image_index + 1).toString() + '枚目の画像';
        image_div_element.appendChild(generateLinkElement(path, linkName));

        const qrcodeDivId = 'qrcode_' + image_index.toString();
        const qrcode_div_element = generateLinkElement(qrcodeDivId);
        const url = window.location.href.replace(/\/[^\/]*\.html?.*/, "") + '/' + path;
        generateQRCode(url, qrcode_div_element);
        image_div_element.appendChild(qrcode_div_element);

        container_element.appendChild(document.createElement("br"));
    })
    {
        container_element.appendChild(document.createElement("br"));
        container_element.appendChild(document.createElement("br"));

        const path = question.id.toString() + '/' + question.answer_image_url;
        const linkName = '答えの画像';
        container_element.appendChild(generateLinkElement(path, linkName))
    }
}

function generateDivElement(id) {
    const div_element = document.createElement("div");
    div_element.setAttribute("id", id);
    return div_element;
}

function generateLinkElement(path, linkName) {
    const a_element = document.createElement("a");
    a_element.setAttribute("href", path);
    a_element.textContent = linkName;

    const p_element = document.createElement("p");
    p_element.appendChild(a_element);
    return p_element;
}

function generateQRCode(url, qrcode_element = null) {
    if (qrcode_element == null) {
        qrcode_element = generateDivElement('qrcode_' + randomString());
    }

    new QRCode(qrcode_element, {
        text: url,
        width: 128,
        height: 128,
    });

    return qrcode_element;
}

function randomString() {
    return Math.floor(Math.random() * 1000000000).toString();
}
