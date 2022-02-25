#include<iostream>
using namespace std;
extern "C" {
   int square(int n) {
      return n * n;
   }
}