import re

import tpp


def remover(file_content, regexes):
    import sys;
    sys.stderr.write(str(regexes))
    for regex in regexes:
        # Replaces matches with empty string
        file_content = re.sub(regex, "", file_content)

    return file_content


def validator(file_content, regexes):
    required_validations = []

    for regex in regexes:
        for match in re.finditer(regex, file_content):
            # Mark the start and end indexes of the match
            required_validations.append({"start": match.start(), "end": match.end()})

    return required_validations


tpp.execute(remover, validator)
