import React, { Component } from 'react';


const Home = (props) => (
	<article className="markdown-body entry-content" itemProp="text"><h1><a id="user-content-reactreduxsaga-demo" className="anchor" href="#reactreduxsaga-demo" aria-hidden="true"><svg aria-hidden="true" className="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>React/Redux/Saga Demo</h1>
	<p>A simple application demonstrating the general architecture of an application built on the React, Redux and Redux-Saga.
	Each of them is responsible for its level of responsibility and is conceptually separated from the others:</p>
	<ul>
	<li><strong>React Components</strong>: just render views in accordance with the current state of the store. They contain only pure presentation logic.</li>
	<li><strong>Redux Reducers</strong>: just update the state of the store in accordance with the data transmitted from the actions. They do not contain any logic other than update logic.</li>
	<li><strong>Sagas</strong>: implement any other logic, including all kinds of side effects.</li>
	</ul>
	<p><a href="https://github.com/typicode/json-server">Json-server</a> is used as a fake server that supports the simplest RESTful-queries without data validating.</p>
	<h3><a id="user-content-installation" className="anchor" href="#installation" aria-hidden="true"><svg aria-hidden="true" className="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Installation</h3>
	<div className="highlight highlight-source-shell"><pre>$ git clone https://github.com/swarga-core/rrs-demo.git
	$ npm install</pre></div>
	<h3><a id="user-content-usage" className="anchor" href="#usage" aria-hidden="true"><svg aria-hidden="true" className="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Usage</h3>
	<div className="highlight highlight-source-shell"><pre>$ npm run start-dev</pre></div>
	<p>The application will be available at <a href="http://localhost:8080">http://localhost:8080</a></p>
	<h2><a id="user-content-license" className="anchor" href="#license" aria-hidden="true"><svg aria-hidden="true" className="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>License</h2>
	<p>MIT</p>
	</article>
);

export default Home;