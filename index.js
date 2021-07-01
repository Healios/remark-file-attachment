const visit = require("unist-util-visit");

module.exports = (options) =>
{
	function extractGroups(line)
	{
		const match = line.match(/attachment (.*?) text (.*?) placement(.*?) end/);
		if (match == null) return { attachment: null, text: null, placement: null, };

		const attachment = match[1].trim();
		const text = match[2].trim();
		const placement = match[3].trim();

		return { attachment, text, placement, };
	}

	function attributesAreValid(attachment, text, node)
	{
		// When a file has not been provided, render an error.
		if (attachment == "undefined" || attachment.length == 0)
		{
			node.type = "html";
			node.value = `<p><span style="color: red; font-weight: bold;">remark-file-attachment Error:</span> You must specify an attachment.</p>`;
			return false;
		}

		// When a text has not been provided, render an error.
		if (text == "undefined" || text.length == 0)
		{
			node.type = "html";
			node.value = `<p><span style="color: red; font-weight: bold;">remark-file-attachment Error:</span> You must specify a text.</p>`;
			return false;
		}

		return true;
	}

	return tree =>
	{
		visit(tree, "inlineCode", node =>
		{
			if (node.value.startsWith("attachment"))
			{
				// Get matches.
				const matches = node.value.match(/attachment (.*?) text (.*?) placement(.*?) end/g);

				// When the markdown has been incorrectly formatted, render an error.
				if (matches == null)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-file-attachment Error:</span> The markdown is not correctly formatted.</p>`;
					return;
				}

				// Figure out how to align the attachment/s.
				// Regardless of whether there is more than one attachment, grab the first placement value.
				const placement = extractGroups(matches[0]).placement;

				// Declare a shit-ton of variables...
				let alignmentCss = "", containerCss = "", containerStyle = "", itemCss = "", itemStyle = "",
					iconHTML = "", paragraphCss = "", paragraphStyle = "", iconAndParagraphContainerCss = "", iconAndParagraphContainerStyle = "",
					showLinkCss = "", showLinkStyle = "", showLinkText = "Show", showLinkAltText = "Show attachment in new tab",
					downloadLinkCss = "", downloadLinkStyle = "", downloadLinkText = "Download", downloadLinkAltText = "Download attachment",
					linkContainerCss = "", linkContainerStyle = "";
	
				if (options != undefined)
				{
					// Figure out how to align the attachment.
					alignmentCss = options.cssClassToCenter;
					if (placement == "Left") alignmentCss = options.cssClassToLeftAlign;
					if (placement == "Right") alignmentCss = options.cssClassToRightAlign;
					if (alignmentCss == undefined) alignmentCss = "";

					// Get css config for grouped attachments.
					containerCss = options.containerCss != undefined ? options.containerCss : "";
					containerStyle = options.containerStyle != undefined ? options.containerStyle : "";
					itemCss = options.itemCss != undefined ? options.itemCss : "";
					itemStyle = options.itemStyle != undefined ? options.itemStyle : "";

					// Get icon html config.
					iconHTML = options.iconHTML != undefined ? options.iconHTML : "";

					// Get css config for paragraph.
					paragraphCss = options.paragraphCss != undefined ? options.paragraphCss : "";
					paragraphStyle = options.paragraphStyle != undefined ? options.paragraphStyle : "";

					// Get css icon and paragraph container config.
					iconAndParagraphContainerCss = options.iconAndParagraphContainerCss != undefined ? options.iconAndParagraphContainerCss : "";
					iconAndParagraphContainerStyle = options.iconAndParagraphContainerStyle != undefined ? options.iconAndParagraphContainerStyle : "";

					// Get css and text config for show link.
					showLinkCss = options.showLinkCss != undefined ? options.showLinkCss : "";
					showLinkStyle = options.showLinkStyle != undefined ? options.showLinkStyle : "";
					showLinkText = options.showLinkText != undefined ? options.showLinkText : "Show";
					showLinkAltText = options.showLinkAltText != undefined ? options.showLinkAltText : "Show attachment in new tab";

					// Get css and text config for download link.
					downloadLinkCss = options.downloadLinkCss != undefined ? options.downloadLinkCss : "";
					downloadLinkStyle = options.downloadLinkStyle != undefined ? options.downloadLinkStyle : "";
					downloadLinkText = options.downloadLinkText != undefined ? options.downloadLinkText : "Download";
					downloadLinkAltText = options.downloadLinkAltText != undefined ? options.downloadLinkAltText : "Download attachment";

					// Get css config for link container.
					linkContainerCss = options.linkContainerCss != undefined ? options.linkContainerCss : "";
					linkContainerStyle = options.linkContainerStyle != undefined ? options.linkContainerStyle : "";
				}

				// Generate html based on whether it is a single attachment or a group of attachments.
				let attachmentHTML = "";
				attachmentHTML += `<ul class="${containerCss}" style="${containerStyle}">`;
				for(const line of matches)
				{
					const { attachment, text } = extractGroups(line);
					if (!attributesAreValid(attachment, text, node)) return;
					
					attachmentHTML += `<li class="${itemCss}" style="${itemStyle}"><div class="${iconAndParagraphContainerCss}" style="${iconAndParagraphContainerStyle}">${iconHTML}<span class="${paragraphCss}" style="${paragraphStyle}">${text}</span></div><div class="${linkContainerCss}" style="${linkContainerStyle}"><a href="${attachment}" target="_blank" aria-label="${showLinkAltText}" class="${showLinkCss}" style="${showLinkStyle}">${showLinkText}</a><a href="${attachment}" download aria-label="${downloadLinkAltText}" class="${downloadLinkCss}" style="${downloadLinkStyle}">${downloadLinkText}</a></div></li>`;
				}
				attachmentHTML += "</ul>"

				// Update the node.
				node.type = "html";
				node.value = `<div class="${alignmentCss}">${attachmentHTML}</div>`;
			}
		});
	};
};
