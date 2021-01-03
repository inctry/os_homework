<template>
	<el-container>
		<el-header> 
			<current-path> </current-path> 
		</el-header>
		<el-main>
      <current-option> </current-option>
    </el-main>
	</el-container>
</template>

<script>

import CurrentPath from '../components/CurrentPath'
import CurrentOption from '../components/CurrentOption'

export default {
	components: {
		CurrentPath,CurrentOption
	}
}
</script>

<style lang="scss">
.el-header {

}
.el-main {

}
</style>
