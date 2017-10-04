import sys
import json
import argparse


# Enum to contain rule types
class RuleTypes(object):
    AUTOMATED_MODIFIER = "Automated Modifier"
    MANUAL_VALIDATOR = "Manual Validator"


def execute(remover, validator):
    parser = argparse.ArgumentParser()
    parser.add_argument("file_path")

    parsed_arguments = parser.parse_args()

    with open(parsed_arguments.file_path, "r") as f:
        content = f.read()

    rules = json.loads(sys.stdin.readlines()[0])
    result = {"validations": []}

    for rule in rules:
        # Determine rule type to dispatch the right processing function
        if rule["ruleType"] == RuleTypes.AUTOMATED_MODIFIER:
            content = remover(content, rule["regularExpressions"])

        elif rule["ruleType"] == RuleTypes.MANUAL_VALIDATOR:
            for validation in validator(content, rule["regularExpressions"]):
                result["validators"].append(validation)

    with open(parsed_arguments.file_path + ".processed", "w") as f:
        f.write(content)

    print(json.dumps(result))
