PHP简单易学，JSP在学周期和开发周期都比较长，但JSP比PHP运行速度快。PHP适合一般应用，中小型的网站应用。JSP适合中大型网站的应用。另外JSP比较安全，像那些银行网站和电子商务网站都是用JSP写的

PHP可以编译成具有与许多数据库相连接的函数。PHP与MySQL是现在绝佳的组合。你还可以自己编写外围的函数去间接存取数据库。通过这样的途径当你更换使用的数据库时，可以轻松地更改编码以适应这样的变化。PHPLIB就是最常用的可以提供一般事务需要的一系列基库。但PHP提供的数据库接口支持彼此不统一，比如对Oracle, MySQL，Sybase的接口，彼此都不一样。这也是PHP的一个弱点。

变量以 $ 符号开始，后面跟着变量的名称------------------------------------------
变量名必须以字母或者下划线字符开始
变量名只能包含字母数字字符以及下划线（A-z、0-9 和 _ ）
变量名不能包含空格
变量名是区分大小写的（$y 和 $Y 是两个不同的变量）
<?php
$x=5;$y=6;
$z=$x+$y;echo $z;  //11
?>

PHP 有四种不同的变量作用域：------------------------------------------
local、global、static、parameter
local-------------------------
<?php 
$x=5; // 全局变量 
function myTest() 
{ 
    $y=10; // 局部变量 
    echo "<p>测试函数内变量:<p>"; 
    echo "变量 x 为: $x"; 
    echo "<br>"; 
    echo "变量 y 为: $y"; 
}  
myTest(); 
echo "<p>测试函数外变量:<p>"; 
echo "变量 x 为: $x"; 
echo "<br>"; 
echo "变量 y 为: $y"; //NULL
?>
global------------------------
<?php
$x=5;
$y=10;
function myTest()
{
	global $x,$y;
	$y=$x+$y;
}
function myTest()
{
    $GLOBALS['y']=$GLOBALS['x']+$GLOBALS['y'];
} 
myTest();
echo $y; // 输出 15
?>
PHP 将所有全局变量存储在一个名为 $GLOBALS[index] 的数组中。 index 保存变量的名称。这个数组可以在函数内部访问，也可以直接用来更新全局变量。
static--------------------------
当一个函数完成时，它的所有变量通常都会被删除。然而，有时候您希望某个局部变量不要被删除。
要做到这一点，请在您第一次声明变量时使用 static 关键字：
<?php
function myTest()
{
    static $x=0;
    echo $x;
    $x++;
}
myTest();//0
myTest();//1
myTest();//2
?>
参数--------------------------
<?php
function myTest($x)
{
    echo $x;
}
myTest(5);
?>


echo、print-----------------------------------------------------------------------
echo - 可以输出一个或多个字符串,  print - 只允许输出一个字符串，返回值总为 1
<?php
$txt1="学习 PHP";
$txt2="RUNOOB.COM";
$cars=array("Volvo","BMW","Toyota");
echo $txt1;
echo "<br>";
echo "在 $txt2 学习 PHP ";
echo "<br>";
echo "我车的品牌","是 {$cars[0]}"; //两个字符串
?>

<?php
$txt1="学习 PHP";
$txt2="RUNOOB.COM";
$cars=array("Volvo","BMW","Toyota");
 
print $txt1;
print "<br>";
print "在 $txt2 学习 PHP ";
print "<br>";
print "我车的品牌是 {$cars[0]}";
?>