---
layout: post
title: "字符串题EP1"
date: 2025-12-10 22:42:50 +0800
categories: [C, Algorithm]
author: iLOVESZU-1
---

> **Time:** 2025-12-10 22:42
> **Location:** 深圳大学致理楼L2-404

---

c
最长单词
```
#include <stdio.h>
#include <string.h>

void MaxLenWord(char s[]	//这里就是函数
{
	int i = 0;
	int start = 0;
	int max_len = 0;
	int cur_len = 0;
	while(s[i] != '\0')		// '\0'是直接到字符串的最后 不要用'\n' 虽然最后一个是'\n'但是会出现一些问题
	{
		
		if(s[i] == ' ')	//在这里检测单词是否结束
		{
			if(max_len < cur_len) max_len = cur_len;
			cur_len = 0;		//单词长度清零
		}
		else{
			cur_len++;
		}
		i++;
	}
	if(cur_len > max_len) max_len = cur_len;
	
	i=0;
	cur_len = 0;
	int first = 0;
	while(s[i] != '\0')
	{
		if(s[i] == ' ')
		{
			if(cur_len == max_len)
			{
				if(first != 0)
				{
					printf(" ");
				}
				for(int j = start;j < start + cur_len;j++)
				{

					printf("%c",s[j]);	//转变思路，在单词的前边加空格而不是后边
				}
				first = 1;
			}
			start = i + 1;		//在空格的后边重新开始计数
			cur_len = 0;
		}
		else{
			cur_len++;
		}
		i++;
	}
	if(cur_len == max_len)
	{
				if(first != 0)
				{
					printf(" ");
				}
						for(int j = start;j < start + cur_len;j++)
						{
		
							printf("%c",s[j]);	//转变思路，在单词的前边加空格而不是后边
						}
	}
	
}

int main()
{
	int times = 0;
	scanf("%d",&times);
	getchar();
	char char1[1001];
	for(int i = 0;i < times;i++)
	{
		fgets(char1,sizeof(char1),stdin);
		int len = strlen(char1);
		if(len >0&& char1[len - 1] == '\n')
		{
			char1[len-1] = '\0';
		}
		
		
		MaxLenWord(char1);
		if(i != times - 1)
		{
			printf("\n");
		}
	}
}

//草泥马
```
太菜了导致被这破题硬控一个小时。HLN。留个档我就不信以后我再重做的时候秒不掉。

问题：

一.我不爱做字符串的题，感觉太繁琐，事多。

二.没有天天写题，这两天天天抠线性代数，手生。

三.有些知识点不知道，就例如’\0’和’\n’在字符串里的的区别，甚至把’\0’和空格整混，到最后因为结束了所以没有检测最后的单词，而且检测最后的单词之前还需要看它是不是第一个单词，好麻烦啊啊啊啊啊啊啊啊啊啊啊啊啊！！！！！！

我觉得我现在的状态好奇怪，每天都投入很多时间但是效果还不如那些临时突击一下的，无论是高等数学线性代数还是c语言。

但是，我对我的智力还是有一定信心的，出现这种状况，嘛，和高中的状态完全反转了呀。

不过，我还是相信**天道酬勤**这四个字。天才很少，而且用功的天才，更少。

在这个环境里，只要我做到我的最好，那就完全没有任何焦虑的必要了。

好久没更新，一是懒二是活多。寒假可能会把去湖南和香港玩的照片整理一下发出来嘻嘻，届时会保护其他人的个人隐私。
