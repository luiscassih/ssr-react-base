import express, { NextFunction, Request, Response } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
export default (_req: Request, res: Response, next: NextFunction) => {
	res.render = (component, clientId , props = {}) => {
		const rendered = renderToString(React.createElement(component, props as any));
		res.send(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet"> 
				<link rel="stylesheet" href="/styles.css" />
				<link rel="icon" href="/favicon.svg">
		</head>
		<body>
				<div id="app">${rendered}</div>
				<script>window._initialState=${JSON.stringify(props)}</script>
				<script src="/vendor.js"></script>
				<script src="/clients/${clientId}.js"></script>
		</body>
		</html>
		`);
	};
	next();
}