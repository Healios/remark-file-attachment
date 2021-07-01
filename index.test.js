// Import remark to parse markdown.
const remark = require("remark");

// Import our plugin.
const plugin = require("./index");

// Setup shared data.
const processorWithCss = remark().use(plugin, {
    cssClassToCenter: "w-full flex justify-center",
    cssClassToLeftAlign: "w-full flex justify-start",
    cssClassToRightAlign: "w-full flex justify-end",

    containerCss: "border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3",
    containerStyle: "list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;",
    itemCss: "pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600",
    itemStyle: "content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;",

    iconHTML: `<svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg>`,
    paragraphCss: "ml-2 truncate text-gray-800 max-w-xs",
    iconAndParagraphContainerCss: "flex items-center max-w-32 md:max-w-max",

    linkContainerCss: "ml-3 inline-flex space-x-4",

    showLinkText: "Vis",
    showLinkAltText: "Vis dokument i ny fane",
    showLinkCss: "font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline",
    showLinkStyle: "text-decoration: none;",

    downloadLinkText: "Hent",
    downloadLinkAltText: "Hent dokument",
    downloadLinkCss: "font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline",
    downloadLinkStyle: "text-decoration: none;",
});

const processorWithoutCss = remark().use(plugin);

const base = [
    "to-replace",
    "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    "It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.",
    "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
    "",
].join("\n");

const incorrectlyFormattedMarkdownError = `<p><span style="color: red; font-weight: bold;">remark-file-attachment Error:</span> The markdown is not correctly formatted.</p>`;
const attachmentMissingError = `<p><span style="color: red; font-weight: bold;">remark-file-attachment Error:</span> You must specify an attachment.</p>`;
const textMissingError = `<p><span style="color: red; font-weight: bold;">remark-file-attachment Error:</span> You must specify a text.</p>`;

// Tests.
describe("Markdown validation common denominators", () => {
    test("error is rendered, when markdown is incorrectly formatted", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf Document 1 placement Left end\`");
        let expectedResult = base.replace("to-replace", incorrectlyFormattedMarkdownError);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("error is rendered, when attachment isn't specified", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment  text Document 1 placement Left end\`");
        let expectedResult = base.replace("to-replace", attachmentMissingError);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("error is rendered, when attachment is undefined", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment undefined text Document 1 placement Left end\`");
        let expectedResult = base.replace("to-replace", attachmentMissingError);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("error is rendered, when text isn't specified", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text  placement Left end\`");
        let expectedResult = base.replace("to-replace", textMissingError);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("error is rendered, when text is undefined", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text undefined placement Left end\`");
        let expectedResult = base.replace("to-replace", textMissingError);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });
});

describe("Single attachment", () => {
    test("css classes are applied, when the css options have been provided", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text /uploads/document.pdf placement Left end\`");
        let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start"><ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;"><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">/uploads/document.pdf</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li></ul></div>`);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("css classes aren't applied, when the css options haven't been provided", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text /uploads/document.pdf placement Left end\`");
        let expectedResult = base.replace("to-replace", `<div class=""><ul class="" style=""><li class="" style=""><div class="" style=""><span class="" style="">/uploads/document.pdf</span></div><div class="" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Show attachment in new tab" class="" style="">Show</a><a href="/uploads/document.pdf" download aria-label="Download attachment" class="" style="">Download</a></div></li></ul></div>`);

        const result = processorWithoutCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("placeholder is centered", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text /uploads/document.pdf placement Center end\`");
        let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-center"><ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;"><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">/uploads/document.pdf</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li></ul></div>`);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("placeholder is left aligned", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text /uploads/document.pdf placement Left end\`");
        let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start"><ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;"><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">/uploads/document.pdf</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li></ul></div>`);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("placeholder is right aligned", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text /uploads/document.pdf placement Right end\`");
        let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-end"><ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;"><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">/uploads/document.pdf</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li></ul></div>`);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });
});

describe("Multiple attachments", () => {
    test("css classes are applied, when the css options have been provided", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text Document 1 placement Left end attachment /uploads/document2.pdf text Document 2 placement Left end\`");
        let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start"><ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;"><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">Document 1</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">Document 2</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document2.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document2.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li></ul></div>`);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("css classes aren't applied, when the css options haven't been provided", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text Document 1 placement Left end attachment /uploads/document2.pdf text Document 2 placement Left end\`");
        let expectedResult = base.replace("to-replace", `<div class=""><ul class="" style=""><li class="" style=""><div class="" style=""><span class="" style="">Document 1</span></div><div class="" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Show attachment in new tab" class="" style="">Show</a><a href="/uploads/document.pdf" download aria-label="Download attachment" class="" style="">Download</a></div></li><li class="" style=""><div class="" style=""><span class="" style="">Document 2</span></div><div class="" style=""><a href="/uploads/document2.pdf" target="_blank" aria-label="Show attachment in new tab" class="" style="">Show</a><a href="/uploads/document2.pdf" download aria-label="Download attachment" class="" style="">Download</a></div></li></ul></div>`);

        const result = processorWithoutCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("placeholder is centered", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text Document 1 placement Center end attachment /uploads/document2.pdf text Document 2 placement Left end\`");
        let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-center"><ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;"><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">Document 1</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">Document 2</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document2.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document2.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li></ul></div>`);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("placeholder is left aligned", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text Document 1 placement Left end attachment /uploads/document2.pdf text Document 2 placement Center end\`");
        let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-start"><ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;"><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">Document 1</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">Document 2</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document2.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document2.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li></ul></div>`);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });

    test("placeholder is right aligned", () =>
    {
        let inputString = base.replace("to-replace", "\`attachment /uploads/document.pdf text Document 1 placement Right end attachment /uploads/document2.pdf text Document 2 placement Left end\`");
        let expectedResult = base.replace("to-replace", `<div class="w-full flex justify-end"><ul class="border border-gray-200 rounded-md divide-y divide-gray-200 max-w-lg mb-3" style="list-style: none !important; margin-top: 0 !important; margin-bottom: 0 !important;"><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">Document 1</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li><li class="pr-4 py-3 flex items-center justify-between text-sm text-gray-400 focus-within:text-blue-600" style="content: none; position: static !important; margin-top: 0 !important; margin-bottom: 0 !important; padding-left: 0.75rem !important;"><div class="flex items-center max-w-32 md:max-w-max" style=""><svg focusable="false" aria-hidden="true" class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" /></svg><span class="ml-2 truncate text-gray-800 max-w-xs" style="">Document 2</span></div><div class="ml-3 inline-flex space-x-4" style=""><a href="/uploads/document2.pdf" target="_blank" aria-label="Vis dokument i ny fane" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Vis</a><a href="/uploads/document2.pdf" download aria-label="Hent dokument" class="font-medium text-blue-600 hover:text-blue-500 outline-none focus:underline" style="text-decoration: none;">Hent</a></div></li></ul></div>`);

        const result = processorWithCss.processSync(inputString).toString();
        expect(result).toBe(expectedResult);
    });
});
