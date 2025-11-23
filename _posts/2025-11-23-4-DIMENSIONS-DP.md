---
layout: post
title: "四维DP的学习"
date: 2025-11-23 12:47:50 +0800
categories: [C++, Algorithm]
---

例题：洛谷P1004方格取数
四维DP
```**思路**

两条路线同时规划：

x1、y1、x2、y2

由于最后同时到达，所以x1+y1 = x2 + y2 = k（自己设的）

y1 = k - x1，y2 = k - x2。总体来看可以省一个变量

所以需要的就为k,x1,x2三个变量



k的范围为[2，2N] {（0,0)到(1,1)和(0,0)到(N,N)}

grid[x][y]是(x,y)的值

dp[k][x][y] 是两条路线的和

dp[2][1][1] = grid[1][1]

行号i必须满足 1 <= i <= N 且  1 <= c1 <= N,c1 = k - i 即 k - n <= i  <= k - 1

 即i >= 1 且 i >= k - n 

i需要大于这里两个最大的

然后开始枚举第一条路径和行号和列号

在满足第一条路径的前提下枚举第二条路径的行号和列号

计算每一个可能的情况（第一条路径行与列和第二条路径行与列同时满足的情况）能拿到的数字总和

开始分情况讨论：

①走到同一个格子时，只能取一次该格子的值

②走到不一样的格子时，此时这种情况的值是两个格子的和



然后开始状态转移

开始比较上一步的四种可能，取最大的结果

①两条路径都从上方走来

②第一条路径从上方走来，第二条路径从左方走来

③第一条路径从左方走来，第二条路径从上方走来

④两条路径都从左方走来

这里的判断过程用到了i，j的值。因为只有第一行的没有上一行。

通过这四种可能找到上一步的最优状态。

接着将上一步的最优状态加上这一步的情况值，就得到了这一步的最优状态。

最终两条路径都到达（N,N），cout 一下··dp[2 * N][N][N]的值就得到了最大值。
```
**接下来是AI代码实现**

```
#include <iostream>
#include <cmath>
#include <cstring>
using namespace std;

const int MAXN = 10;
int grid[MAXN][MAXN] = {0};
int dp[2*MAXN][MAXN][MAXN];	//dp[k][i][j]

int main()
{
	int n = 0;
	cin >> n;
	memset(grid,0,sizeof(grid));
	while(1)
	{
		int x,y,val;
		cin >> x >> y >>val;
		if(x == 0 && y == 0 && val == 0)
		break;
		grid[x][y] = val;
	}
	fill(dp[0][0],dp[0][0] + n * n,0);
	dp[2][1][1] = grid[1][1];
	for(int k=3;k<=2 * n;k++)
	{
		for(int i = max(1,k - n);i<=min(n,k - 1);i++)
		{
			int c1 = k - i;	//第一条路径的列号
			//j:第二条路径的行号
			for(int j = max(1,k - n);j <= min(n,k - 1);j++)
			{
				int c2 = k - j;
				//获取当前格子的值（同格只取一次）
				int val = (i==j) ? grid[i][c1] : grid[i][c1] + grid[j][c2];
				
				int best = 0;
				//两条都从上方来
				if(i > 1 && j > 1) best = max(best,dp[k-1][i-1][j-1]);
				//第一条从上，第二条从左
				if(i > 1) best = max(best,dp[k-1][i-1][j]);
				if(j > 1) best = max(best,dp[k-1][i][j-1]);
				best = max(best,dp[k-1][i][j]);
				
				dp[k][i][j] = best + val;
			}
		}
	}
	cout << dp[2*n][n][n] << endl;
	return 0;
}
```
**我的复现**
```
#include <iostream>
#include <cmath>
#include <algorithm>

using namespace std;
const int MAXN = 10;
int grid[MAXN][MAXN] = {};
int dp[2 * MAXN][MAXN][MAXN] = {};	//k,x1,x2

int main()
{
	//行数，统计特殊点的位置和坐标
	int n = 0;
	cin >> n;
	while(1)
	{
		int x,y,a = 0;
		cin >> x >> y >> a;
		if(x == 0 && y == 0)
		{
			break;
		}
		grid[x][y] = a;
	}

		dp[2][1][1] = grid[1][1];	//起步 到起点的点数等于起点的值
	
	for(int k = 3;k <= 2 * MAXN;k++)
	{
		for(int i = max(1,k-n);i <= min(n,k-1);i++)	//限制第一条路径的行数列数
		{
			for(int j = max(1,k-n);j <= min(n,k-1);j++)	//第二条路径同理
			{
				int current_value = 0;				
				current_value = grid[i][k-i] + grid[j][k-j];	//这里细节先写这个，因为如果第二个不满足就不用再写了
				if(i == j)
				current_value = grid[i][k-i];
				
				//开始状态转移！！！！
				//第一种情况
				int max_num = 0;	//这里看的是上一步最大 
				if(i > 1 && j > 1)	//all down
				{
					max_num = max(max_num,dp[k-1][i-1][j-1]);
				}
				if(i > 1)	// 1st down 
				{
					max_num = max(max_num,dp[k-1][i-1][j]);
				}
				if(j > 1)	//2nd down
				{
					max_num = max(max_num,dp[k-1][i][j-1]);
				}
				max_num = max(max_num,dp[k-1][i][j]);	//neither down
				
				dp[k][i][j] = current_value + max_num;		//该点的DP值等于current_value(该点的值)+max_num(先前DP值最大的可能)
			}
		}
	}
	cout << dp[2 * n][n][n] << endl;
	return 0;
}
```



这应该是我目前做过最难的题，啊！
2025年11月23日 19点58分 L2-406

