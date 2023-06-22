import React from 'react';
import App from './App';
import { range } from './util/number-functions';
import LifeMatrix from './service/LifeMatrix';



test("sum of range", ()=>{
  expect(range(2,5)).toEqual([2,3,4]);
}) 

test("matrix test", ()=>{
  const firstMatrix = [[0,0,0,0], [0,1,1,0], [0,1,1,0], [0,0,0,0]]
  const matrix = new LifeMatrix(firstMatrix);
  expect(matrix.next()).toEqual(firstMatrix);
}) 

