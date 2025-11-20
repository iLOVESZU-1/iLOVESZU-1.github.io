①最SB题目：找鞍点

思想：循环

题目描述



矩阵的鞍点是矩阵的一个元素，该元素是所在行的最大值，所在列的最小值。

输入一个二维数组的行数n，列数m，二维数组的各元素值；输出矩阵的鞍点，以及鞍点所在的行列号。

测试数据不用考虑存在多个鞍点的情况，如果鞍点存在，则一定唯一。

输入

测试组数

每组测试数据格式如下：

二维数组行数n 列数m( 0<n,m<10)

n行m列数据(整数）

输出

对每组测试数据，如果不存在鞍点，输出null。如果存在鞍点，鞍点及其行，列位置。具体格式见样例。

IO模式

本题IO模式为标准输入/输出(Standard IO)，你需要从标准输入流中读入数据，并将答案输出至标准输出流中。





<details>

<summary>点击我展开</summary>



#include <stdio.h>

int main()
{
int n,m = 0; 		//row:n line:m
int matrix[10][10] = {};
int i,j,k,l,times = 0;
int judge = 1;
scanf("%d",&times);
for(k=0;k<times;k++)
{
scanf("%d%d",&n,&m);
for(i=0;i<n;i++)
{
for(j=0;j<m;j++)
{
scanf("%d",&matrix[i][j]);
}
}
for(i=0;i<n;i++)
{
for(j=0;j<m;j++)
{
for(l=0;l<n;l++)
{
if(matrix[i][j] > matrix[l][j])
judge = 0;
}
for(l=0;l<m;l++)
{
if(matrix[i][j] < matrix[i][l])
judge = 0;
}
if(judge == 1)
{
printf("%d %d %d\n",matrix[i][j],i+1,j+1);
judge = 0;
break; 
}
if(i== n - 1 && l == m && judge == 0)
{
printf("null\n");
break;
}

			judge = 1;   		}   		if(judge == 0)   		break;   	}   	   	   	   	   }   return 0;   

}

</details>

关于我的代码，AI权威点评：

① 可读性弱





可读性 (Readability)：judge 变量承担了双重职责：既是当前元素的鞍点判断结果，又是全局的退出标志。这使得代码的意图不够直观，对于其他阅读者（或者未来的你）来说，理解 judge = 0 在找到鞍点后的作用，以及 if(i== n - 1 && l == m && judge == 0) 的复杂逻辑，需要花费更多的时间。



② 判断完非鞍点后没有马上退出，浪费时间。





AI改进版

#include <stdio.h>

int main()
{
int n,m = 0; // row:n col:m
int matrix[10][10] = {};
int i,j,k,l,times = 0;
int judge = 1;
int found = 0;

scanf("%d",&times);  
for(k = 0;k < times;k++)  
{  
	scanf("%d%d",&n,&m);  
	for(i=0;i<n;i++)  
	{  
		for(j=0;j<m;j++)  
		{  
			scanf("%d",&matrix[i][j]);  
		}  
	}  
	  
	found = 0;  
	for(i = 0;i < n;i++)  
	{  
		if(found) break;  
		for(j = 0;j<m;j++)  
		{  
			if(found) break;  
			  
			judge = 1;  
			  
			for(l=0;l<n;l++)  
			{  
				if(matrix[i][j] > matrix[l][j])  
				{  
				judge = 0;  
				break;  
				}  
			}  
			if(judge == 0) continue;  
			  
			for(l = 0;l<m;l++)  
			{  
				if(matrix[i][j] < matrix[i][l])  
				{  
					judge = 0;  
					break;  
				}  
			}  
			  
			if(judge == 1)  
			{  
				printf("%d %d %d\n",matrix[i][j],i+1,j+1);  
				found = 1;  
				break;  
			}  
		}  

		}  
		if(!found){  
			printf("null\n");  
	}  
}  
return 0;  


}

	

使用了if(found) break; 快速离开循环

这个一般放在开头，因为循环就是从开头开始的。

判定完为鞍点后，（前提judge = 1）赋给found = 1的值。这样两个变量分离，可读性强。



然后对于我的初版代码，l最后的值为m，因为(l=0;l<m;l++)的执行顺序为3 2，l先自增后判断是否小于m。

一开始被坑了一直不出结果。

好累，分析的时间是写代码时间的好几倍。

2025年11月20日23点11分

SZU L2-407

代码部分帮我分行 复制过去坏了
