import { Frequency } from "@careminder/shared/types";
import pluralize from "pluralize";

export function readableFrequency({ frequency, frequency_type, every, on, on_type, special }: Frequency): string {
    if (special) return "On special occasions";
    if (!frequency || !frequency_type) return "As needed";

    const frequencyText = [];
    if (frequency == 1) frequencyText.push("Once");
    else if (frequency === 2) frequencyText.push("Twice");
    else frequencyText.push(`${frequency}x`);

    if (!every) frequencyText.push("a");
    else frequencyText.push(`every ${every.toString()}`)
    frequencyText.push(pluralize(frequency_type, every ?? 1));

    if (on.length) frequencyText.push(on.join(', '));
    if (on.length && on_type) frequencyText.push(`${on_type} of the ${frequency_type}`);

    return frequencyText.join(" ");
}
