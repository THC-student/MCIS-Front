<!-- <template>
    <div>
        <canvas ref="canvas" :width="imageWidth" :height="imageHeight" @mousedown="startDrawing" @mousemove="drawRect"
            @mouseup="endDrawing"></canvas>
        <hr style="width:600px;">
        <br>
        <el-button type="success" @click="saveImage">确认图片</el-button>
    </div>
</template>

<script>
import { Store } from 'vuex';
import { useStore } from 'vuex'
const store = useStore();
export default {
    data() {
        return {
            canvas: null,
            ctx: null,
            drawing: false,
            startX: 0,
            startY: 0,
            rectWidth: 0,
            rectHeight: 0,
            rects: [],
            imageWidth: 600,
            imageHeight: 450,
            imageUrl: 'https://qhglhh.oss-cn-beijing.aliyuncs.com/a3099489-e80a-4192-9c45-6b983989c6cd.jpg', // 请替换为您的图片链接  
            backgroundImage: null, // 用于存储背景图片的Image对象  
        };
    },
    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        // 加载背景图片  
        this.backgroundImage = new Image();
        this.backgroundImage.src = this.imageUrl;
        this.backgroundImage.onload = () => {
            this.drawBackground(); // 绘制背景图片  
        };
    },
    methods: {
        drawBackground() {
            // 绘制背景图片到canvas上  
            this.ctx.clearRect(0, 0, this.imageWidth, this.imageHeight);
            this.ctx.drawImage(this.backgroundImage, 0, 0, this.imageWidth, this.imageHeight);
        },
        startDrawing(event) {
            this.drawing = true;
            this.startX = event.clientX - this.canvas.getBoundingClientRect().left;
            this.startY = event.clientY - this.canvas.getBoundingClientRect().top;
        },
        drawRect(event) {
            if (!this.drawing) return;
            const canvasRect = this.canvas.getBoundingClientRect();
            const currentX = event.clientX - canvasRect.left;
            const currentY = event.clientY - canvasRect.top;

            // 计算矩形的宽度和高度  
            let rectWidth = currentX - this.startX;
            let rectHeight = currentY - this.startY;

            // 如果鼠标向左或向上移动，需要处理负值  
            if (rectWidth < 0) {
                rectWidth = -rectWidth;
                this.startX = currentX;
            }
            if (rectHeight < 0) {
                rectHeight = -rectHeight;
                this.startY = currentY;
            }

            // 确保矩形不会超过canvas的边界  
            rectWidth = Math.min(rectWidth, this.canvas.width - this.startX);
            rectHeight = Math.min(rectHeight, this.canvas.height - this.startY);

            this.clearCanvas();
            this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);


            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 2; // 设置线条宽度  
            this.ctx.strokeRect(this.startX, this.startY, rectWidth, rectHeight);
        },
        endDrawing() {
            this.drawing = false;
            this.rects.push({ x: this.startX, y: this.startY, width: this.rectWidth, height: this.rectHeight });
        },
        clearCanvas() {
            // 清除整个画布并重新绘制背景  
            this.ctx.clearRect(0, 0, this.imageWidth, this.imageHeight);
            this.drawBackground();
            // 清除矩形列表（如果需要的话 
            this.rects = [];
        },

        saveImage() {
            const canvas = document.createElement('canvas');
            canvas.width = this.imageWidth;
            canvas.height = this.imageHeight;
            const ctx = canvas.getContext('2d');

            // 创建一个新的Image对象，并设置crossOrigin属性  
            const image = new Image();
            image.crossOrigin = 'Anonymous'; // 设置为Anonymous以允许跨源请求  
            image.src = this.imageUrl;

            image.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布上的所有内容  
                ctx.drawImage(image, 0, 0, this.imageWidth, this.imageHeight);

                // 绘制矩形框  
                this.rects.forEach(rect => {
                    ctx.beginPath(); // 开始新的路径  
                    ctx.strokeStyle = 'red';
                    ctx.rect(rect.x, rect.y, rect.width, rect.height); // 使用rect而不是strokeRect来定义矩形路径  
                    ctx.stroke(); // 绘制矩形框  
                });

                try {
                    // 将canvas内容转换为Blob对象  
                    canvas.toBlob((blob) => {
                        // 创建一个新的URL对象表示该Blob对象  
                        const blobUrl = URL.createObjectURL(blob);

                        // Blob转换为File对象  
                        const file = new File([blob], 'filename.png', { type: 'image/png' });
                        console.log(file)
                        // 如果你想存储Blob URL  
                        this.$store.commit('updateKuangUrl', file);

                        /* // 释放创建的Blob URL，防止内存泄漏  
                        URL.revokeObjectURL(blobUrl); */
                    }, 'image/png'); // 第二个参数是图片格式
                } catch (error) {
                    // 处理任何可能的错误  
                    console.error('Failed to export canvas:', error);
                }
            };
        },
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.imageWidth, this.imageHeight);
        },

    },
};
</script>

<style scoped>
canvas {
    border: 1.5px solid rgb(126, 173, 248);
    border-radius: 10px;
}
</style> -->
<template>
  <div style="position: relative;top:-25px;left:-20px;">
    <input type="file" accept="image/*" @change="onFileChange" style="position: relative;left:30px;"/>
    <br>
    <br>
    <canvas ref="canvas" @mousedown="startDrawing" @mousemove="drawRect" @mouseup="endDrawing"
      @mouseleave="endDrawing" />
      <hr style="width:600px;">
      <el-button type="success" @click="saveImage" style="position:relative;top:20px;">确认图片</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';

const canvas = ref(null);
const ctx = ref(null);
const image = ref(null);
const drawing = reactive({
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
  isDrawing: false
});

onMounted(() => {
  ctx.value = canvas.value.getContext('2d');
});

const onFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      image.value = img;
      drawImage();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};

const drawImage = () => {
  if (!image.value || !canvas.value) return;
  canvas.value.width = image.value.width;
  canvas.value.height = image.value.height;
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.value.drawImage(image.value, 0, 0);
};

const startDrawing = (event) => {
  drawing.start = { x: event.offsetX, y: event.offsetY };
  drawing.isDrawing = true;
};

const drawRect = (event) => {  
  if (!drawing.isDrawing) return;  
    
  // 获取鼠标相对于canvas的坐标  
  const rect = canvas.value.getBoundingClientRect();  
  const mouseX = event.clientX - rect.left;  
  const mouseY = event.clientY - rect.top;  
  
  // 确保绘制的矩形不会超过图片的尺寸  
  const imgWidth = image.value.width;  
  const imgHeight = image.value.height;  
  let x = Math.max(0, Math.min(mouseX, drawing.start.x));  
  let y = Math.max(0, Math.min(mouseY, drawing.start.y));  
  let width = Math.abs(mouseX - drawing.start.x);  
  let height = Math.abs(mouseY - drawing.start.y);  
  
  // 确保宽度和高度不会超过图片边界  
  width = Math.min(width, imgWidth - x);  
  height = Math.min(height, imgHeight - y);  
  
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);  
  ctx.value.drawImage(image.value, 0, 0);  
  ctx.value.beginPath();  
  ctx.value.rect(x, y, width, height);  
  ctx.value.lineWidth = 2;  
  ctx.value.strokeStyle = 'red';  
  ctx.value.stroke();  
  
  drawing.end = { x: mouseX, y: mouseY };  
};

const endDrawing = () => {
  if (!drawing.isDrawing) return;
  drawing.isDrawing = false;
  // 可以在这里添加代码来处理画完框后的图片，比如裁剪或者保存  
};


import { useStore } from 'vuex'
const store = useStore();
const saveImage = async () => {
  console.log('a', drawing.isDrawing, canvas.value)
  if (drawing.isDrawing || !canvas.value) return;
  console.log('b')
  const canvasData = canvas.value.toDataURL('image/png');
  console.log('c')
  const response = await fetch(canvasData);
  console.log('d')
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  console.log('11111111111', url)
  const file = new File([blob], 'filename.png', { type: 'image/png' });
  console.log(file)
  store.state.file=file;
  const link = document.createElement('a');
  link.href = url;
  link.download = 'boxed-image.png';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);


};
</script>

<style scoped>
canvas {
    border: 1.5px solid rgb(126, 173, 248);
    border-radius: 10px;
    width:550px;
    height:400px;
}
</style>