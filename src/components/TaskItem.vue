<template>
    <div class="task-item">
        <p>
            {{task.title}} 
            {{task.user}} 
            {{task.points}} 
            {{task.deadline}}  
            <input type="checkbox" v-on:change="markCompletev" v-model="task.completed" />
        </p>
        
    </div>
</template>

<script>


export default {
    name: "TaskItem",
    props: ["task"]
}
</script>

<style scoped>
    .task-item {
        background: #f4f4f4;
        padding: 4px;
        padding-left: 16px;
        border-bottom: 1px #ccc dotted;
    }

    .del {
        background: #ff0000;
        color: #fff;
        border: none;
        padding: 5px 9px;
        border-radius: 50%;
        cursor: pointer;
        float: right;
    }

</style>