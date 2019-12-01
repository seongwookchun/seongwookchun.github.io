<head>
	<link rel="stylesheet" type="text/css" href="style01.css" />
</head>
<body>
prj1901_ai_cover_letter_assistant.html
<p>
<h1>Team project - AI cover letter assistant</h1>
<h2>A rudimentary study on text generation, abstractive summarization and auto labeling with corpus of cover letters(Korean langauge)</h2>
</p>
<br>

<p>
<h3>Authors</h3>
Seung-geun Park / Seunggeun.parkk@gmail.com<br>
Bachelor of Arts in English Language and Literature<br>
Comparasion of Word2vec performance with respect to training iteration and corpus<br>
[On going] Implementation of auto labeling on multi labeled samples with BERT model<br>
</p>
<p>
Yoon-ho Song / dbsgh3322@gmail.com<br>
Bachelor of Science in Industrial Engineering, Inha University Department of Industrial Engineering.<br>
Contributions:<br>
Implementation of texts generation model.<br>
Implementation of abstractive summarization model.<br>
</p>
<p>
Seong-wook Chun / chun3842@gmail.com<br>
Bachelor of Science in Physics, University of Seoul, Korea.<br>
contributions:<br>
Implementation of auto labeling on multi labeled samples with MLP model.<br>
Support for implementation of NLG models.<br>
</p>
<p>

</p>
<p>
<h3>Abstract</h3>
Concept of the project: <br>
These days, job seekers make a lot of efforts and spend their time to get promising jobs.
Although hiring processes are different by companies and such as document screening, aptitude test, interview, and group discussion and each steps are important to pass to the next step, however, the most important thing and the thing that shows who they are and how they are aptitude to requirements of promising roles is cover letter. We planned this project to support for writing cover letters easily by offering three main functions and one subsidiary model to help making datasets for the main models.<br><br>
<li>Synonym recommendation</li>
<li>Auto-completion of sentence</li>
<li>Title recommendation</li>
<li>Auto labeling with MLP and BERT</li>
<br>
Technics: word2vec, LSTM, seq2seq, BERT(classification)<br>

Conclusions: The synonym recommendation function of word2vec model does not always shows synonyms. The <p>Synonym recommendation<br>
Word2vec model returns with some keywords such as "증가-increase" with return value of "감소-decrease". We learned that these tendancy that sometimes the word2vec model returns antonyms is inborn nature of the word2vec model caused by its embedding alogorithm using relation between a central word and neighboring words within window size. Therefore new algorithn is needed in order to get only synonyms excluding antonyms. Meanwhile, we learned that it is required careful interpretation on how close are of two words with 2D scatter plot using tknr library in that the angles in the 2D plots does not always match with the cosine values calculated in N dimension</p>

<p>Auto-completion of sentence<br>
Auto-completion of sentence is implemented with LSTM layer and it uses tokens seperated by whitespace. The model trained with entire corpus returns sentences which are more complete in grammar compared to other model with categorized corpus. Meanwhile the model with cateogorized corpus seems to return topic specialized sentences. The tokenization by phoneme can not be adopted which exceeds memory limit of the 10Gb GPU memory which are, however, successfully applied to text generation model. The reason is that LSTM layer forces to expand each sentences of input data by sliding token by token.</p>

<p>Title recommendation<br>
Title recommendation is implemented with seq2seq model and it uses tokens seperated by phoneme with conversion Korean characters into roman characters. The model with transfer learning seems to return titles which are different from target title compared to other model without transfer learning. Although those two model often return titles, which are grammatically incorrect and are awkward combinations of words, are good at making meaningful words at least without breaking a character into consonants and vowels.</p>

<p>Auto labeling<br>
The auto labeling model implemented with MLP creates data which is used in other main generative models would be quite useful when it's validation accuracy with 55% is improved. The activation function of the output layer should be sigmoid function 
The auto labeling model implemented with MLP should choose sigmoid function at the output layer rather than softmax function. Because it is impossible to classify the text-title pairs with only one label. It is inevitable for about one third of input data to be labeled with more than one category among 9 types totally. The BERT model trained only with single labeled text-title pairs reaches high validation accuracy over than 90% when the training epoch is only 8 while the model with MLP reaches its best performance, 55% when the training epoch is about 2,000. The BERT model for multi labeled text-title pairs are being implemented.</p>

<p>Datasets<br>
Datasets are 6,000 cover letters which have 4 pairs of questions and answers on average. Each answers in the pairs mostly includes paragraphs titles which are surrounded by title marks such as ", ', [], () or are next to an index number, for example. 
<li>"title of the text"</li>
<li>1. title of the text</li>
Titles are mostly well extracted by using regular expression with simple patterns, however, there are few bad cases also when writers just use the title marks inside the text to emphasize words or enumerate lists such as their skills.<br></p>
<p>Model implementation<br></p>
<p>Synonym recommendation<br>
Word2vec is used for the synonym recommendation function. We observes outputs with regard to changing training iteration and input corpus for the word2vec model. While, other hyperparameters such as word vector dimension, window size, number of minimum repeation and word2vec algorithm are fixed:<br>
<table border=1>
	<tr>
		<td>hyperparameters
		<td>values
	</tr>
	<tr>
		<td>dim. of word vector
		<td>200
	</tr>
	<tr>
		<td>window size
		<td>5
	</tr>
	<tr>
		<td>num. of minium repeation
		<td>5
	</tr>
	<tr>
		<td>algorithm
		<td>sg
	</tr>
</table>
<p>One models are trained with 6,000 cover letters corpus(35Mb) and the other are trained with 81Mb wikidata[1]. The input data is filtered with Okt pos tagger into nouns. Although there remains still unuseful tokens such as "것(thing), 수(able), 이(this), 그(the), 저(that)", however, they are few and are ignorable. Because the window size is selected as 5, so we concluded that it is enough big to offset when the stopwords appears next to central words.</p>
</p>

</body>
