export function parser(text: string, values: any, startDelimeter = "{", endDelimeter = "}") {
	//  you received {comment.amount} money from {comment.link}
	let startIndex = 0
	let endIndex = 1
	let finalString = ""

	while (endIndex < text.length) {

		if (text[startIndex] === startDelimeter) {
			let endpoint = startIndex + 1

			while (endpoint < text.length && text[endpoint] !== endDelimeter) {
				endpoint++
			}

			let stringHolding = text.slice(startIndex + 1, endpoint)
			const keys = stringHolding.split(".")

			let localvalues = { ...values }

			for (let i = 0; i < keys.length; i++) {
				if (typeof localvalues === "string") {
					localvalues = JSON.parse(localvalues)
				}
				localvalues = localvalues[keys[i] as string]
			}

			finalString += localvalues ?? ""
			startIndex = endpoint + 1
			endIndex = startIndex + 1

		} else {
			finalString += text[startIndex]
			startIndex++
			endIndex++
		}
	}
	if (text[startIndex]) {
		finalString+=text[startIndex]
	}
	return finalString
}
