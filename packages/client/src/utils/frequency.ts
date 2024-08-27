import { Frequency, FrequencyType } from "@careminder/shared/types";

export function readableFrequency({ frequency, frequency_type, on, on_type, special }: Frequency): string {
    if (special) return "On special occasions";
    if (!frequency || !frequency_type) return "As needed";

    const frequencyText = [];
    if (frequency == 1) frequencyText.push("Once");
    else if (frequency === 2) frequencyText.push("Twice");
    else frequencyText.push(`${frequency}x`);

    frequencyText.push("a");
    frequencyText.push(frequency_type);

    if (on.length) frequencyText.push(on.join(', '));
    if (on.length && on_type) frequencyText.push(`${on_type} of the ${frequency_type}`);

    return frequencyText.join(" ");
}