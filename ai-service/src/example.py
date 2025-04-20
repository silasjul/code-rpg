from collections import defaultdict

input_list = ["eat", "tea", "tan", "ate", "nat", "bat"]

def group_anagrams(words):
    result = defaultdict(list)
    for word in words:
        result[sort_word(word)].append(word)
    return list(result.values())

def sort_word(word):
    return "".join(sorted(word))

result = group_anagrams(input_list)
print(result)  # Expected output: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']] (order may vary)